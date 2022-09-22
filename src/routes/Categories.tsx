import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import MainPanelHeader from "../components/MainPanelHeader";

export type CategoriesProps = {
  myAgentId: string;
};

const Categories: React.FC<CategoriesProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>Categories</h2>
        <div>
          <Link to="/categories/new">
            <SlButton variant="primary">Add Category</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <CategoryList myAgentId={myAgentId} />
    </>
  );
};

export default Categories;
