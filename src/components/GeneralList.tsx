import React from "react";
import {
  SlButton,
  SlButtonGroup,
  SlCard,
  SlIcon,
  SlInput,
} from "@shoelace-style/shoelace/dist/react";

export type GeneralListProps = {
  dataTable: React.ReactElement;
};

const GeneralList: React.FC<GeneralListProps> = ({ dataTable }) => {
  return (
    <SlCard className="general-list">
      {/* Header */}
      <div className="general-list-header">
        <SlInput placeholder="Search..." clearable disabled>
          <SlIcon name="search" slot="prefix"></SlIcon>
        </SlInput>
        <SlButtonGroup>
          <SlButton disabled>
            <SlIcon name="filter-circle" slot="prefix"></SlIcon>
            Filter
          </SlButton>
          <SlButton disabled>
            <SlIcon name="sort-down" slot="prefix"></SlIcon>Sort
          </SlButton>
        </SlButtonGroup>
      </div>

      <div className="data-table">
        {dataTable}
      </div>
    </SlCard>
  );
};

export default GeneralList;
