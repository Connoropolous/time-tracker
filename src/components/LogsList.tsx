import React from "react";
import { SlCheckbox, SlFormatDate } from "@shoelace-style/shoelace/dist/react";
import GeneralList from "./GeneralList";

export type LogsListProps = {
  myAgentId: string;
  queryResults: any
};

const LogsList: React.FC<LogsListProps> = ({ myAgentId, queryResults }) => {
  const { data, loading, error } = queryResults;
  if (loading) return <div>Listing logs...</div>;
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
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            <SlCheckbox disabled />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="data-table-column" style={{ flex: 2 }}>
        <div className="data-table-header">Description</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.note}
          </div>
        ))}
      </div>

      {/* Category */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Category</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.inputOf.name}
          </div>
        ))}
      </div>

      {/* Start Date Time */}
      <div className="data-table-column" style={{ flex: 2 }}>
        <div className="data-table-header">Start Time</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            <SlFormatDate
              date={event.node.hasBeginning}
              month="long"
              day="numeric"
              year="numeric"
              hour="numeric"
              minute="numeric"
            />
          </div>
        ))}
      </div>

      {/* End Date Time */}
      <div className="data-table-column" style={{ flex: 2 }}>
        <div className="data-table-header">End Time</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            <SlFormatDate
              date={event.node.hasEnd}
              month="long"
              day="numeric"
              year="numeric"
              hour="numeric"
              minute="numeric"
            />
          </div>
        ))}
      </div>
    </>
  );
  // {data.economicEvents.edges.length === 0 && (
  // <div style={{ textAlign: "center", marginTop: "1rem" }}>
  // There are no events yet. Use 'Add Event' to add one.
  // </div>
  // )}
  return <GeneralList dataTable={dataTable} />;
};

export default LogsList;
