// /Blog/BlogHelpers.js
export const filterOptions = [
  { id: "all", label: "All" },
  { id: "leadership", label: "Leadership" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "legacy", label: "Legacy" },
];

export const sortOptions = ["Newest", "Oldest", "Popular", "Trending"];

export const sortPosts = (posts, selectedSort) => {
  const result = [...posts];
  if (selectedSort === "Newest") {
    return result.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
  }
  if (selectedSort === "Oldest") {
    return result.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
  }
  if (selectedSort === "Popular") {
    return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  if (selectedSort === "Trending") {
    return result.sort((a, b) => {
      const ageA = Math.max(
        0,
        Math.floor((Date.now() - new Date(a.isoDate)) / (1000 * 60 * 60 * 24))
      );
      const ageB = Math.max(
        0,
        Math.floor((Date.now() - new Date(b.isoDate)) / (1000 * 60 * 60 * 24))
      );
      const scoreA = (a.popularity || 0) / (ageA + 1);
      const scoreB = (b.popularity || 0) / (ageB + 1);
      return scoreB - scoreA;
    });
  }
  return result;
};
