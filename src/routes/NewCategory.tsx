import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CreateCategory from "../components/CreateCategory";
import MainPanelHeader from "../components/MainPanelHeader";

export type NewCategoryProps = {
  myAgentId: string;
};

const NewCategory: React.FC<NewCategoryProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Category</h2>
        <Link to="/categories">
          <SlButton variant="primary">View Categories</SlButton>
        </Link>
      </MainPanelHeader>
      <CreateCategory myAgentId={myAgentId} />
    </>
  );
};

export default NewCategory;
