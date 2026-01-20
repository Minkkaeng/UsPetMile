import type { PlacePolicyStandard } from "../../types/place";

type PolicyTableProps = {
  policy: PlacePolicyStandard;
};

const boolLabel = (value: boolean) => (value ? "가능" : "불가");

export default function PolicyTable({ policy }: PolicyTableProps) {
  return (
    <div className="policy-table">
      <div className="policy-section">
        <h3>Dog</h3>
        <ul>
          <li>소형: {boolLabel(policy.dogSize.small)}</li>
          <li>중형: {boolLabel(policy.dogSize.medium)}</li>
          <li>대형: {boolLabel(policy.dogSize.large)}</li>
          <li>실내 동반: {boolLabel(policy.indoorAllowed)}</li>
          <li>목줄 필수: {boolLabel(policy.leashRequired)}</li>
          <li>추가요금: {boolLabel(policy.extraFee)}</li>
          <li>최대 마릿수: {policy.maxPets}마리</li>
        </ul>
      </div>
      <div className="policy-section">
        <h3>Cat</h3>
        <ul>
          <li>동반 가능: {boolLabel(policy.catAllowed)}</li>
          <li>캐리어 필수: {boolLabel(policy.carrierRequired)}</li>
          <li>실내만 가능: {boolLabel(policy.catIndoorOnly)}</li>
          <li>추가요금: {boolLabel(policy.extraFee)}</li>
          <li>최대 마릿수: {policy.maxPets}마리</li>
        </ul>
      </div>
    </div>
  );
}
