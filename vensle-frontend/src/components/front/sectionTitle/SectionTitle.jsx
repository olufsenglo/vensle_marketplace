const SectionTitle = ({ children }) => {
    return (
	  <h2 className="block pb-1 border-b-2 border-red-500 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:inline md:text-left md:text-2xl"
          >
	    {children}
        </h2>
    )
}

export default SectionTitle;
