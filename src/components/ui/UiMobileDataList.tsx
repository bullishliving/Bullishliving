import { Header, Row } from "./UiTable"

interface Props {
  headers: Header[];
  data: Row[];
  
}

export default function UiMobileDataList({ data, headers, }: Props) {
  return (
    <div className="grid gap-6">
      {data.map((item, index) => (
        <div key={index} className="grid gap-4 bg-white rounded-lg p-4">
          {item.topNode && <div>{item.topNode}</div>}
          {headers.map((header, index) => (
            <div
              key={`mobile-table-header-${index}`}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-tertiary-700">{header.title}</span>
              <span key={index} className="text-sm font-cera-bold font-bold">
                {item[header.query]}
              </span>
            </div>
          ))}
          {item.bottomNode && <div>{item.bottomNode}</div>}{' '}
        </div>
      ))}
    </div>
  );
}
