import { Pagination } from "@mui/material";

interface PropsType {
  pageCount: number | undefined;
  handlePageChange: (page: number) => void;
  page: number;
}

const Paginate = (props: PropsType) => {
  const { pageCount, handlePageChange: handlePageChang, page } = props;

  const totalPageNo = (no: number) => {
    return Math.ceil(no / 20);
  };

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    handlePageChang(value);
  };

  return (
    <div className="w-11/12 mx-auto flex justify-center mb-10 ">
      <Pagination
        count={totalPageNo(pageCount || 0)}
        page={page}
        onChange={pageChangeHandler}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={0}
        boundaryCount={2}
      />
    </div>
  );
};

export default Paginate;
