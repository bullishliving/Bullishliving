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
  size?: 'md' | 'lg'
}

export default function UiTable({ data, headers, size= 'md' }: Props) {
  return (
    <table className="w-full font-montserrat">
      <thead>
        <tr
          className={`bg-[#F4F4F4] ${size === 'md' ? 'h-9 rounded-[8px]' : 'h-14'}`}
        >
          {headers.map((header, index) => (
            <th
              className={`text-xs text-tertiary-700 text-left font-bold  px-4 ${size === 'md' && `${index === 0 && 'rounded-l-lg'}`} ${index === headers.length -1 && 'rounded-r-lg'}`}
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
            className={`${index + 1 !== data.length ? 'border-b' : ''} ${size === 'md' ? 'min-h-14 py-5' : 'min-h-24'}  text-sm font-bold text-[#0B0A0A] `}
          >
            {headers.map((header) => (
              <td key={header.query} className={`px-4 ${size === 'md' ? 'py-2' : 'py-4'}`}>
                <div>{item[header.query]}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
