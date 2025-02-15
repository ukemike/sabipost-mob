import { useState, useEffect } from "react";

interface Image {
  url: string;
  title: string;
  snippet: string;
}

interface UseImageSearch {
  searchTerm: string;
  triggerSearch: boolean;
}

const useImageSearch = ({ searchTerm, triggerSearch }: UseImageSearch) => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!triggerSearch || searchTerm === "") {
      setImages([]);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyAf2Mz7Pt_hCBXi796LQP-NjlfukPKXOC4&cx=5697f074664c31024&q=${searchTerm?.trim()}&searchType=image&fileType=jpg`
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
        setError("Error fetching images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, triggerSearch]);

  return [images, isLoading, error] as const;
};

export default useImageSearch;
