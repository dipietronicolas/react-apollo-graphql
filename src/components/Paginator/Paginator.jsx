import React from 'react'
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import { Center, Flex } from '@chakra-ui/react';

const Paginator = ({ handlePageChange }) => {

  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    pagesCount: 34,
    initialState: { currentPage: 1 },
  });

  React.useEffect(() => {
    handlePageChange(currentPage)
  }, [handlePageChange, currentPage])

  return (
    <Center h={["15rem", "10rem"]}>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}>
        <PaginationContainer>
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup>
            <Flex wrap="wrap" w={[200, 300, 500]} justify="center">
              {pages.map((page) => (
                <PaginationPage
                  key={`pagination_page_${page}`}
                  page={page}
                />
              ))}
            </Flex>
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Center>
  )
}

export default Paginator
