import { Pagination } from "@mui/material";

interface PropsType {
  pageCount: number | undefined;
  handlePageChange: (page: number) => void;
  page: number;
}

const Paginate = (props: PropsType) => {
  const { pageCount, handlePageChange: handlePageChang, page } = props;

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    handlePageChang(value);
  };
  return (
    <div className="w-11/12 mx-auto flex justify-center mb-10 ">
      <Pagination
        count={pageCount}
        page={page}
        onChange={pageChangeHandler}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default Paginate;
