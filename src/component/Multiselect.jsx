import { useEffect, useState, useRef, useMemo, useCallback } from "react";

function Multiselect({ options, selectedOptions, onSelectionChange, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [dropdownUp, setDropdownUp] = useState(false);
  const dropdownHeight = 300; // высота dropdown

  // Мемоизированный фильтр опций по поисковому запросу
  const filterOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((item) => item.region.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  // Закрытие выпадающего списка при клике вне компонента
  const handleOutsideClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
      setDropdownUp(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Обработка поиска
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Обработка выбора опции (добавление/удаление объекта)
  const handleSelect = useCallback(
    (item) => {
      onSelectionChange(item);
      setSearchTerm("");
    },
    [onSelectionChange]
  );

  // Очистка выбранных опций
  const handleClear = useCallback(() => {
    onSelectionChange([]);
    setSearchTerm("");
  }, [onSelectionChange]);

  // Проверка места для dropdown
  const checkDropdownPosition = () => {
    if (!ref.current) return;

    const containerRect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - containerRect.bottom;
    setDropdownUp(spaceBelow < dropdownHeight);
    setIsOpen(true);
  };

  return (
    <div className="w-100 relative" ref={ref}>
      <div className="flex bg-white text-black rounded-[6px] items-center border-2">
        <ul
          className="multiselect-scrollbar flex gap-1.5 p-1.5 items-center w-100 min-h-[48px] overflow-x-auto "
          onClick={checkDropdownPosition}
        >
          {!selectedOptions.length && <li className="opacity-50">{placeholder}</li>}
          {selectedOptions
            ?.sort((a, b) => a.region.localeCompare(b.region))
            .map((item) => (
              <li key={item.region} className="flex gap-1 p-1.5 bg-amber-100 text-black rounded-[4px]">
                <p>{item.region}</p>

                <span onClick={() => onSelectionChange(item)} className=" cursor-pointer">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.75732 7.75745L16.2426 16.2427"
                      stroke="black"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M16.2426 7.75745L7.75732 16.2427"
                      stroke="black"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </li>
            ))}
        </ul>

        {!!selectedOptions.length && (
          <button onClick={handleClear} className="end-0 p-1 w-[30px] h-[30px] rounded-0 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <img src="/arrow-down.png" width="24px" height="24px" className={`p-1 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </div>
      {isOpen && (
        <div
          className={`bg-white text-black  absolute w-full border-2 rounded-[6px] z-10 ${
            dropdownUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          <div className="p-1.5">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="focus:outline-0 border-1 p-1 w-full rounded-[6px]"
            />
          </div>

          <ul
            className='multiselect-scrollbar  overflow-auto text-left p-2.5 pt-0'
            style={{ maxHeight: `${dropdownHeight}px` }}
          >
            {filterOptions.length ? (
              filterOptions.map((item) => (
                <li
                  key={item.region}
                  onClick={() => handleSelect(item)}
                  className="cursor-pointer hover:bg-amber-100 hover:text-black rounded-[6px] p-1.5 mb-0.5"
                >
                  {item.region}
                </li>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Multiselect;
