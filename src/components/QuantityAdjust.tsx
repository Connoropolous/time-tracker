import React, { useState } from "react";
import {
  SlButton,
  SlDropdown,
  SlIconButton,
  SlInput,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";
import { useMutation } from "@apollo/client";
import { UPDATE_ECONOMIC_RESOURCES } from "../graphql/queries";

export type QuantityAdjustProps = {
  resource: any;
  myAgentId: string;
};

const QuantityAdjust: React.FC<QuantityAdjustProps> = ({
  resource,
  myAgentId,
}) => {
  const [callAdjust, mutationStatus] = useMutation(UPDATE_ECONOMIC_RESOURCES);
  // for tracking the persisted value
  const [originalQuantity, setOriginalQuantity] = useState(
    +resource.accountingQuantity.hasNumericalValue
  );

  // for adjusting
  const [quantityAbsolute, setQuantityAbsolute] = useState(
    +resource.accountingQuantity.hasNumericalValue
  );
  const [quantityAdjustment, setQuantityAdjustment] = useState(0);

  //
  const update = async () => {
    await callAdjust({
      variables: {
        event: {
          action: quantityAdjustment > 0 ? "raise" : "lower",
          provider: myAgentId,
          receiver: myAgentId,
          resourceQuantity: {
            hasNumericalValue: Math.abs(quantityAdjustment),
            hasUnit: resource.accountingQuantity.hasUnit
              ? resource.accountingQuantity.hasUnit.id
              : null,
          },
          resourceInventoriedAs: resource.id,
          hasPointInTime: new Date(),
        },
      },
    });
    // update original, so that the save button hides
    setOriginalQuantity(quantityAbsolute);
  };

  return (
    <div className="quantity-adjust">
      <div className="resource-list-resource-quantity">
        <SlInput
          value={quantityAbsolute.toString()}
          onSlInput={(e) => {
            // @ts-ignore (numeric)
            const absolute = +e.target.value;
            const adjustment = absolute - originalQuantity;
            setQuantityAbsolute(absolute);
            setQuantityAdjustment(adjustment);
          }}
        />
      </div>
      {resource.accountingQuantity.hasUnit && (
        <div>{resource.accountingQuantity.hasUnit.symbol}</div>
      )}
      <SlDropdown>
        <SlIconButton slot="trigger" name="sliders"></SlIconButton>
        <SlMenu>
          <SlMenuItem disabled>
            <SlInput
              label="Adjust by"
              type="number"
              value={quantityAdjustment.toString()}
              onSlInput={(e) => {
                // @ts-ignore (numeric)
                const adjustment = +e.target.value;
                setQuantityAbsolute(originalQuantity + adjustment);
                setQuantityAdjustment(adjustment);
              }}
            ></SlInput>
          </SlMenuItem>
        </SlMenu>
      </SlDropdown>

      {/* Save Button */}
      <SlButton
        variant="primary"
        onClick={update}
        // @ts-ignore
        style={{
          visibility:
            originalQuantity !== quantityAbsolute ? "visible" : "hidden",
        }}
      >
        Save
      </SlButton>
    </div>
  );
};

export default QuantityAdjust;
