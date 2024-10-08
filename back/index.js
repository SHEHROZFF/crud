const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const xlsx = require('xlsx');
const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
const mongoose = require('mongoose');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Define your MongoDB schema
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', DataSchema);

// Define storage and filter for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // Ensure 'images' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    cb(null, uniqueFilename);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPG, JPEG, and PNG are allowed!'), false);
  }
};

// Define storage and filter for file uploads (Excel and CSV)
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type!'), false);
  }
};

const uploadFile = multer({ storage: fileStorage, fileFilter: fileFilter });
const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter });

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/exports', express.static(path.join(__dirname, 'exports')));

app.use('/api/users', userRoutes);
// app.use('/api/files', fileRoutes');

// Upload API endpoint for Excel and CSV files
app.post('/api/upload-file', uploadFile.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = req.file.path;
  const data = [];

  const insertData = async (data) => {
    await DataModel.collection.insertMany(data);
    res.send('Data uploaded to MongoDB');
  };

  if (req.file.originalname.endsWith('.xlsx') || req.file.originalname.endsWith('.xls')) {
    // Read Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    data.push(...jsonData);
    await insertData(data);
  } else if (req.file.originalname.endsWith('.csv')) {
    // Read CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', async () => {
        await insertData(data);
      });
  } else {
    res.status(400).send('Unsupported file type');
  }
});

// Export API endpoint
app.get('/api/export', async (req, res) => {
  const data = await DataModel.find().lean();

  if (!fs.existsSync('exports')) {
    fs.mkdirSync('exports');
  }

  // File paths
  const excelFilePath = `exports/data_${Date.now()}.xlsx`;
  const csvFilePath = `exports/data_${Date.now()}.csv`;

  // Export to Excel
  const exportToExcel = new Promise((resolve, reject) => {
    try {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      xlsx.writeFile(workbook, excelFilePath);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  // Export to CSV
  const exportToCsv = new Promise((resolve, reject) => {
    try {
      const ws = fs.createWriteStream(csvFilePath);
      fastcsv.write(data, { headers: true }).pipe(ws);
      ws.on('finish', () => resolve());
      ws.on('error', (error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });

  // Wait for both exports to finish
  Promise.all([exportToExcel, exportToCsv])
    .then(() => {
      const excelDownloadLink = `${req.protocol}://${req.get('host')}/exports/${path.basename(excelFilePath)}`;
      const csvDownloadLink = `${req.protocol}://${req.get('host')}/exports/${path.basename(csvFilePath)}`;

      res.json({
        excel: excelDownloadLink,
        csv: csvDownloadLink,
      });
    })
    .catch((error) => {
      console.error('Error exporting files:', error);
      res.status(500).send('Error exporting files');
    });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
