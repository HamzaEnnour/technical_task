import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import classes from "./UserCard.module.scss";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { deleteUser } from "../api/userApi";
const UserCard: React.FC<any> = ({ users, onDelete, onUpdate }) => {
  const { t } = useTranslation();

  const deleteUserMutation = useMutation((userId: number) =>
    deleteUser(userId)
  );

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
    onDelete(userId); // Call the onDelete callback to trigger the refresh in the Home component
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <section className={classes.list_section}>
        <div className={classes.container}>
          <h1>Users Card</h1>
          <div className={classes.cards}>
            {currentUsers?.map((user: any) => (
              <div key={user.id} className={classes.card}>
                <h3 className={classes.h3_with_spacer}>
                  <BiUser /> {user?.name}
                </h3>
                <h3 className={classes.h3_with_spacer}>
                  <AiOutlineMail />
                  {user?.email}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                  }}
                >
                  <button
                    className={classes.btn}
                    style={{ marginBottom: "20px" }}
                    onClick={() => onUpdate(user)}
                  >
                    {t("RULES.UPDATEBTN")}
                  </button>
                  <a
                    style={{ cursor: "pointer", marginLeft: "20px" }}
                    onClick={() => handleDeleteUser(user.id)}
                    title="Delete user"
                  >
                    <AiOutlineDelete />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.pagination}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? classes.active : ""}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

UserCard.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
