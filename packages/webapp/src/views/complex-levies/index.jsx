import { Container, AuthorityCheck } from "@/components/shared";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { PAGE, DEFAULT_PAGE_SIZE } from "@/constants/app.constant";
import { toast, Button } from "@/components/ui";
import { HiOutlinePlusCircle } from "react-icons/hi";
// import Filters from "./list/Filters";
import HomeLoanForm from "./form";
import HomeLoanList from "./list";
import { getHomeLoans } from "@/services/home-loan";
import { useParams } from "react-router-dom";

const HomeLoans = () => {
  const params = useParams();

  const [visible, setVisible] = useState(false);
  const [homeLoanList, setHomeLoanList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(PAGE);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [homeLoan, setHomeLoanData] = useState(null);

  const addNewPost = () => {
    setVisible(true);
  };

  useEffect(() => {
    getHomeLoanListData(page, limit);
  }, []);

  const getHomeLoanListData = async (
    page = PAGE,
    limit = DEFAULT_PAGE_SIZE,
    options = {}
  ) => {
    setLoading(true);
    options.companyId = params.companyId;
    options.page = page;
    options.limit = limit;
    options = _.pickBy(options, _.identity);
    try {
      const response = await getHomeLoans(options);
      setHomeLoanList(response.data.rows);
      setCount(response.data.count);
      setLimit(limit);
      setPage(page);
    } catch (error) {
      toast.push(
        <Notification className="mb-4" type="danger">
          {error?.response?.data.message}
        </Notification>
      );
    }
    setLoading(false);
  };

  const onDialogClose = () => {
    getHomeLoanListData();
    setHomeLoanData(null);
    setVisible(false);
    setTimeout(() => {
      setIsEdit(false);
    }, 700);
  };

  const handleEditHomeLoan = (homeLoan) => {
    setIsEdit(true);
    setVisible(true);
    setHomeLoanData(homeLoan);
  };

  return (
    <Container>
      <HomeLoanForm
        open={visible}
        onClose={onDialogClose}
        isEdit={isEdit}
        data={homeLoan}
      />
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <h3>Complex Levies</h3>
          <div className="flex items-center gap-2">
            <AuthorityCheck authority={["can_add_homeLoan"]}>
              <Button
                size="sm"
                variant="solid"
                icon={<HiOutlinePlusCircle />}
                onClick={addNewPost}
              >
                Add New
              </Button>
            </AuthorityCheck>
          </div>
        </div>
        {/* <Filters getTableData={getHomeLoanListData} /> */}
      </div>

      <Container className="p-4">
        <HomeLoanList
          data={homeLoanList}
          count={count}
          page={page}
          limit={limit}
          getTableData={getHomeLoanListData}
          loading={loading}
          handleEditClick={handleEditHomeLoan}
        />
      </Container>
    </Container>
  );
};

export default HomeLoans;
