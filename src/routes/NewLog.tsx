import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CreateLog from "../components/CreateLog";
import MainPanelHeader from "../components/MainPanelHeader";

export type NewCategoryProps = {
  myAgentId: string;
};

const NewCategory: React.FC<NewCategoryProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Log</h2>
        <Link to="/logging">
          <SlButton variant="primary">View Logs</SlButton>
        </Link>
      </MainPanelHeader>
      <CreateLog myAgentId={myAgentId} />
    </>
  );
};

export default NewCategory;
