import { Container, AuthorityCheck } from "@/components/shared";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { PAGE, DEFAULT_PAGE_SIZE } from "@/constants/app.constant";
import { toast, Button } from "@/components/ui";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Filters from "./list/Filters";
import LabelForm from "./form";
import LabelList from "./list";
import { getLabels } from "@/services/label";
import { useParams } from "react-router-dom";

const HomeLoans = () => {
  const params = useParams();

  const [visible, setVisible] = useState(false);
  const [labelList, setLabelList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(PAGE);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [label, setLabelData] = useState(null);

  const addNewPost = () => {
    setVisible(true);
  };

  useEffect(() => {
    getLabelListData(page, limit);
  }, []);

  const getLabelListData = async (
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
      const response = await getLabels(options);
      setLabelList(response.data.rows);
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
    getLabelListData();
    setLabelData(null);
    setVisible(false);
    setTimeout(() => {
      setIsEdit(false);
    }, 700);
  };

  const handleEditLabel = (label) => {
    setIsEdit(true);
    setVisible(true);
    setLabelData(label);
  };

  return (
    <Container>
      <LabelForm
        open={visible}
        onClose={onDialogClose}
        isEdit={isEdit}
        data={label}
      />
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <h3>Home Loans</h3>
          <div className="flex items-center gap-2">
            <AuthorityCheck authority={["can_add_label"]}>
              <Button
                size="sm"
                icon={<HiOutlinePlusCircle />}
                onClick={addNewPost}
              >
                Add New
              </Button>
            </AuthorityCheck>
          </div>
        </div>
        <Filters getTableData={getLabelListData} />
      </div>

      <Container className="p-4">
        <LabelList
          data={labelList}
          count={count}
          page={page}
          limit={limit}
          getTableData={getLabelListData}
          loading={loading}
          handleEditClick={handleEditLabel}
        />
      </Container>
    </Container>
  );
};

export default HomeLoans;
