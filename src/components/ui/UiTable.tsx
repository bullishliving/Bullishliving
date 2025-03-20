export interface Header {
  title: string;
  query: string;
  alignText?: 'left' | 'right' | 'center';
}
export interface Row extends Record<string, any> {
  id: string;
}
interface Props {
  data: Row[];
  headers: Header[];
}

export default function UiTable({ data, headers }: Props) {
  return (
    <table className="w-full font-montserrat">
      <thead>
        <tr className="bg-[#F4F4F4] h-14">
          {headers.map((header) => (
            <th
              className={`text-xs text-tertiary-700 text-left font-bold  px-4 `}
              key={header.query}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={`${index + 1 !== data.length ? 'border-b' : ''}`}
          >
            {headers.map((header) => (
              <td key={header.query} className="p-4">
                <div>{item[header.query]}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
