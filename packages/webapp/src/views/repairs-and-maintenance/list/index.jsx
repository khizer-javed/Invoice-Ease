import { AuthorityCheck, ConfirmDialog, DataTable } from "@/components/shared";
import { Badge, Card, Notification, Tooltip, toast } from "@/components/ui";
import { PAGE_SIZE_OPTIONS } from "@/constants/app.constant";
import { deleteHomeLoan } from "@/services/home-loan";
import useAuthority from "@/utils/hooks/useAuthority";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";

const RenderHomeLoan = ({ color, label }) => (
  <div className="flex items-center justify-between p-2">
    <div className="flex items-center">
      <Badge className={`bg-${color}-500`} />
      <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
    </div>
  </div>
);

const HomeLoanList = (props) => {
  const {
    data = [],
    className,
    count,
    page,
    limit,
    getTableData,
    loading,
    handleEditClick,
  } = props;

  const { isSuperAdmin } = useSelector((state) => state.auth.loggedInUser);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [homeLoanId, setHomeLoanId] = useState(null);

  const confirmDelete = (homeLoanId) => {
    setConfirmVisible(true);
    setHomeLoanId(homeLoanId);
  };

  const confirmDialog = () => (
    <ConfirmDialog
      title="Delete HomeLoan"
      type="danger"
      isOpen={confirmVisible}
      confirmButtonColor="red-600"
      onConfirm={handleDelete}
      onCancel={() => setConfirmVisible(false)}
      onClose={() => setConfirmVisible(false)}
      loading={deleting}
    >
      Are you sure you want to delete this home loan?
    </ConfirmDialog>
  );

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await deleteHomeLoan(homeLoanId);
      toast.push(
        <Notification className="mb-4" type="success">
          {response?.data.message}
        </Notification>
      );
      getTableData();
      setConfirmVisible(false);
    } catch (error) {
      toast.push(
        <Notification className="mb-4" type="danger">
          {error?.response?.data.message}
        </Notification>
      );
    }
    setDeleting(false);
    setHomeLoanId(null);
  };

  const onPaginationChange = (pageNo) => {
    getTableData(pageNo, limit);
  };

  const onSelectChange = (pageSize) => {
    getTableData(1, pageSize);
  };

  const cols = [
    {
      Header: "Name",
      accessor: "label",

      Cell: (props) => {
        const row = props.row.original;
        return <RenderHomeLoan {...row} />;
      },
    },
    {
      Header: "Created Time",
      accessor: "createdAt",
      Cell: (props) => {
        const row = props.row.original;
        return <span>{dayjs(row.createdAt).format("DD/MM/YYYY hh:mm A")}</span>;
      },
    },
  ];

  const canPerformActions = useAuthority(
    ["can_edit_homeLoan", "can_delete_homeLoan"],
    isSuperAdmin
  );

  if (canPerformActions) {
    cols.push({
      Header: "Actions",
      accessor: "actions",
      Cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex justify-start text-lg">
            <AuthorityCheck authority={["can_edit_homeLoan"]}>
              <Tooltip title="Edit">
                <span className="cursor-pointer p-2 hover:text-blue-500">
                  <HiOutlinePencil onClick={() => handleEditClick(row)} />
                </span>
              </Tooltip>
            </AuthorityCheck>

            <AuthorityCheck authority={["can_delete_homeLoan"]}>
              <Tooltip title="Delete">
                <span className="cursor-pointer p-2 hover:text-red-500">
                  <HiOutlineTrash onClick={() => confirmDelete(row.id)} />
                </span>
              </Tooltip>
            </AuthorityCheck>
          </div>
        );
      },
    });
  }

  const columns = useMemo(() => cols, []);

  return (
    <Card className={className}>
      {confirmDialog()}
      <DataTable
        columns={columns}
        data={data}
        pagingData={{
          pageIndex: page,
          pageSize: String(limit),
          total: count,
        }}
        loading={loading}
        pageSizes={PAGE_SIZE_OPTIONS}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </Card>
  );
};

export default HomeLoanList;
