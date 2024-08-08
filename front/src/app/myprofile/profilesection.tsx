"use client";

import MyLabel from '@/components/label';
import React, { useState, useEffect } from 'react';

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState("https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg");
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        memberId: '',
        membershipDate: '',
        mainEmail: '',
        mainTelephone: '',
        officeEmail: '',
        officeTelephone: '',
        address: '',
        city: '',
        region: '',
        officeName: '',
        yourTitle: '',
        profilePicture: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // console.log(userId);

    // Fetch user profile info on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch('http://localhost:5000/api/users/request-profile-update/' + `${userId}`);
                if (!response.ok) throw new Error('Failed to fetch profile information.');
                const data = await response.json();

                setFormData(data.message);
                // console.log(data);

            } catch (err: any) {
                setError(err.message);
            }
        };
        console.log(fetchProfile());

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            console.log(profilePicture);

            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setError('');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch('http://localhost:5000/api/users/verify-and-update-profile/' + `${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update profile.');

            const result = await response.json();
            console.log('Profile updated successfully:', result);
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='w-1/2 h-full mx-auto'>
                <div className='grid grid-cols-4 mx-auto p-5 h-96 items-center gap-x-8'>
                    <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="" className='w-52 h-52 col-span-1' />
                    <div className='col-span-1 flex flex-col gap-y-8'>
                        <MyLabel inputValue={formData.firstname} labelText='first Name' myplaceholder='First Name' />
                        <MyLabel inputValue={formData.lastname} labelText='last name' myplaceholder='Last name' />
                        <MyLabel inputValue={formData.region} labelText='Region' myplaceholder='Region' />
                        <MyLabel inputValue={formData.yourTitle} labelText='Title' myplaceholder='Title' />

                    </div>
                    <div className='col-span-2 flex flex-col gap-y-8'>
                        <MyLabel inputValue={formData.memberId} labelText='Member ID' myplaceholder='Member ID' />
                        <MyLabel inputValue={formData.mainEmail} labelText='email' myplaceholder='Email' />
                        <MyLabel inputValue={formData.mainTelephone} labelText='Cell' myplaceholder='Cell' />
                        <MyLabel inputValue={formData.membershipDate} labelText='Membership Date:' myplaceholder='Membership Date:' />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-8 mx-auto'>
                    <MyLabel inputValue={formData.officeTelephone} labelText='Office Telephone' myplaceholder='Office telephone' />
                    <MyLabel inputValue={formData.officeEmail} labelText='Office Email' myplaceholder='Office email' />
                    <MyLabel inputValue={formData.officeName} labelText='Office Email' myplaceholder='Office name' />
                </div>
                <div className='mx-auto grid grid-cols-2 gap-5 my-14 items-center'>
                    <div className='col-span-1 w-full'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99370.15308110324!2d-77.09697641303465!3d38.89385915486482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC%2C%20USA!5e0!3m2!1sen!2s!4v1723153797158!5m2!1sen!2s"
                            width={465}
                            height={300}
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </div>
                    <div className='col-span-1 flex flex-col gap-y-8 '>
                        <MyLabel inputValue={formData.address} labelText='Address' myplaceholder='Address' />
                        <MyLabel inputValue={formData.city} labelText='City' myplaceholder='City' />
                        <MyLabel inputValue={formData.address} labelText='Address One' myplaceholder='Address One' />
                        <MyLabel inputValue={formData.address} labelText='Address Two' myplaceholder='Address Two' />
                    </div>
                </div>
            </section>
        </>
    );
}
