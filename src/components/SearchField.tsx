interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchField({
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <div className="mb-6 max-w-sm">
      <label
        htmlFor="country-search"
        className="mb-1 block text-sm font-medium"
      >
        Sök land
      </label>

      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="T.ex. Sweden"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      />
    </div>
  );
}