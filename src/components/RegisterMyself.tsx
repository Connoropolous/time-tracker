import React from "react";
import CreateAgent from "./CreateAgent";
import MainPanelHeader from "./MainPanelHeader";

export type RegisterMyselfProps = {
  onCreated: (id: { id: string, name: string }) => void;
};

const RegisterMyself: React.FC<RegisterMyselfProps> = ({ onCreated }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>Register</h2>
      </MainPanelHeader>
      <CreateAgent isMyself onCreated={onCreated} />
    </>
  );
};

export default RegisterMyself;
