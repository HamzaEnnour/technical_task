import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { deleteUser, getAllUsers } from "../api/userApi";
import { AppContext } from "../contexts/AppContext";
import UserCard from "../components/UserCard";
import EditProfileCard from "../components/EditProfileCard";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<User[], Error> = useQuery("users", () => {
    // Your fetch users API call using axios
    return getAllUsers();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    refetch(); // Refresh the user list after deletion
  };

  const handleEditUser = (u: any) => setSelectedUser(u);

  return (
    <>
      <UserCard
        users={users}
        onDelete={handleDeleteUser}
        onUpdate={handleEditUser}
      />
      {selectedUser && (
        <EditProfileCard
          user={selectedUser}
          onUpdate={() => {
            setSelectedUser(null);
            refetch();
          }}
          profile={false}
        />
      )}
    </>
  );
};

export default Home;
