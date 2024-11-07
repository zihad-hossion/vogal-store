// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.admin.listUsers();
            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data.users); // data.users contains the list of users
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User Emails</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users?.map(user => (
                        <li key={user.id}>{user.email}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserList;
