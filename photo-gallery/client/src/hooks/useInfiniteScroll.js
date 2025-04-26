import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback, options = {}) => {
  const { threshold = 100, initialPage = 1, enabled = true } = options;
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = useCallback(() => {
    if (!enabled || isFetching || !hasMore) return;

    // Check if we're near the bottom of the page
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      setIsFetching(true);
    }
  }, [isFetching, hasMore, threshold, enabled]);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Call the callback when isFetching changes to true
  useEffect(() => {
    if (!isFetching) return;

    const fetchMore = async () => {
      try {
        const nextPage = page + 1;
        const hasMoreData = await callback(nextPage);
        
        if (hasMoreData === false) {
          setHasMore(false);
        } else {
          setPage(nextPage);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMore();
  }, [isFetching, callback, page]);

  // Reset function to start over
  const reset = useCallback(() => {
    setPage(initialPage);
    setHasMore(true);
    setIsFetching(false);
  }, [initialPage]);

  return { isFetching, hasMore, reset };
};

export default useInfiniteScroll;