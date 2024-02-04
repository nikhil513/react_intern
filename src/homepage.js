import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import './homepage.css';

function Home() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [userDetailsData, setUserDetailsData] = useState([]);
    const [isListVisible, setListVisible] = useState(false);

    const handleReset = () => {
        setFirstName('');
        setLastName('');
        setDob('')
    };

    const handleSave = () => {
        if (firstName.trim() === '' || lastName.trim() === '' || dob.trim() === '') {
            alert('Please provide all required information.');
            return;
        }

        // Format the date to 'YYYY-MM-DD'
        const formattedDate = format(new Date(dob), 'yyyy-MM-dd');

        axios.post('http://localhost:3001/user_info', {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: formattedDate
        })
        .then((response) => {
            console.log(response.data);
            handleReset();
        })
        .catch((error) => {
            console.error('Error saving user details:', error);
        });
    };

    const navigate = useNavigate();

    const handlelogout = () => {
        navigate('/');
    };

    const handleList = () => {
        axios.get('http://localhost:3001/user_info')
          .then((response) => {
            setUserDetailsData(response.data);
            setListVisible(true);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
    };
    useEffect(() => {
        if (userDetailsData.length > 0) {
          handleList();
        }
      }, [userDetailsData]);

    return (
        <div className='home'>
            <h2>Home Page</h2>
            <label>First Name: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
            <br />
            <label>Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></label>
            <br />
            <label>Date of Birth: <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} /></label>
            <br />
            <button  onClick={handleReset}>Reset</button>
            <button  onClick={handleSave}>Save</button>  
            <button onClick={handleList}>List</button>
            <p> <button onClick={handlelogout}>Logout</button></p>

            {userDetailsData.length > 0 && (
                <table className={`saved-user-details-table ${isListVisible ? 'visible' : ''}`}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsData.map((userDetails) => (
                      <tr key={userDetails.id}>
                        <td>{userDetails.first_name} {userDetails.last_name}</td>
                        <td>{new Date(userDetails.date_of_birth).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}    
        </div>
    );
}

export default Home;
