import React, {useState} from "react";
import "./Podcasts.css" // Import the CSS file for styling
import Arrow from "../../Assets/PodcastPageAssests/arrow.svg";

export const EpisodeListSection = ()=>{
    const [currentPage, setCurrentPage] = useState(1);

    const paginationData=[
        {page:1, isActive: true},
        {page:2, isActive: false},
        {page:3, isActive: false},
        {page:4, isActive: false},
    ];

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < paginationData.length) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    return(
        <nav className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]"
        role="navigation"
        aria-label="Episode pagination">
            <button className="inline-flex items-center gap-2.5 relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-[#0d0c12] opacity-20 hover:opacity-20 hover:opacity-40 focus:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#0d0c12] focus:ring-offset-2 disabled:cursor-not-allowed" onClick={handlePreviousPage} disabled={currentPage === 1} aria-label="Previous page">
                <div className="-rotate-180 relative w-5 h-5 overflow-hidden">
                    <img src={Arrow} alt="Previous page" className="w-full h-full object-cover" />

                </div>

            </button>
            {paginationData.map((item) => (
                <button
                    key={item.page}
                    className={`inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-[#0d0c12] ${item.isActive ? 'bg-[#801323] text-white' : 'opacity-20 hover:opacity-40 focus:opacity-40'} focus:outline-none focus:ring-2 focus:ring-[#0d0c12] focus:ring-offset-2`}
                    onClick={() => handlePageClick(item.page)}
                    aria-label={`Go to Page ${item.page}`}
                    aria-current={currentPage === item.page ? "page" : undefined}
                >
                    <span className="text-[16px] font-semibold">{item.page}</span>
                </button>
            )
        )}
        <button className="inline-flex items-center gap-2.5 relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-[#0d0c12] opacity-20 hover:opacity-20 hover:opacity-40 focus:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#0d0c12] focus:ring-offset-2 disabled:cursor-not-allowed" onClick={handleNextPage} disabled={currentPage === paginationData.length} aria-label="Next page">
            <div className="rotate-0 relative w-5 h-5 overflow-hidden">
                <img src={Arrow} alt="Next page" className="w-full h-full object-cover" />
            </div>
        </button>


        </nav>
    )
}