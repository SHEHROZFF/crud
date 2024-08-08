import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { logout } from '../../src/utils/auth';

type Props = {
  UserName: string;
}

export default function ProfileDropdown({ UserName }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout(); 
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div className='bg-[#CCC2D9] text-sm font-medium text-black p-2 rounded-full'>
        <AccountCircleOutlinedIcon sx={{ fontSize: "48px", color: "gray" }} />
          {UserName}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}> <a href="/myprofile"> My Profile</a></MenuItem>
        <MenuItem onClick={handleLogout}> Logout</MenuItem>
      </Menu>
    </div>
  );
}
