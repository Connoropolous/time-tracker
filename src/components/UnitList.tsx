import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import { useQuery } from "@apollo/client";
import { LIST_UNITS } from "../graphql/queries";
import GeneralList from "./GeneralList";

export type UnitListProps = {
  myAgentId: string;
};

const UnitList: React.FC<UnitListProps> = ({ myAgentId }) => {
  const { data, loading, error } = useQuery(LIST_UNITS);
  if (loading) return <div>Listing units...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const dataTable = (
    <>
      {/* Checkboxes */}
      <div className="data-table-column">
        {/* Checkbox */}
        <div className="data-table-header">
          <SlCheckbox disabled></SlCheckbox>
        </div>
        {data.units.edges.map((agent: any) => (
          <div className="data-table-cell">
            <SlCheckbox disabled />
          </div>
        ))}
      </div>

      {/* Label */}
      <div className="data-table-column" style={{ flex: 1 }}>
        {/* Label */}
        <div className="data-table-header">Label</div>
        {data.units.edges.map((unit: any) => (
          <div className="data-table-cell data-table-bold">
            {unit.node.label}
          </div>
        ))}
      </div>

      {/* Symbol */}
      <div className="data-table-column" style={{ flex: 1 }}>
        {/* Symbol */}
        <div className="data-table-header">Symbol</div>
        {data.units.edges.map((unit: any) => (
          <div className="data-table-cell">{unit.node.symbol}</div>
        ))}
      </div>
    </>
  );
  return <GeneralList dataTable={dataTable} />;
};

export default UnitList;
