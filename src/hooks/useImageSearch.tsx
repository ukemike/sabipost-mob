import { useState, useEffect } from "react";

interface Image {
  url: string;
  title: string;
  snippet: string;
}

const useImageSearch = (searchTerm: string): [Image[], boolean] => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm === "") {
      setImages([]);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      // trim the white space at the beginning and end of the search term eg samsung s10 -> samsung s10
      const trimmedSearchTerm = searchTerm.trim();
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyAf2Mz7Pt_hCBXi796LQP-NjlfukPKXOC4&cx=5697f074664c31024&q=${trimmedSearchTerm}&searchType=image&fileType=jpg`
        );
        const data = await response.json();

        if (data.items) {
          const fetchedImages = data.items.map((item: any) => ({
            url: item.link,
            title: item.title,
            snippet: item.snippet,
          }));
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm]);

  return [images, isLoading];
};

export default useImageSearch;
