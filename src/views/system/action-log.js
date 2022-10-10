import dayjs from "dayjs";

const tableHeader = [
    // {
    //     label: "用户",
    //     prop: "user_id",
    //     width: "100",
    // },
    {
        label: "描述",
        prop: "desc",
        width: "200",
    },
    {
        label: "资源ID",
        prop: "source_id",
        width: "100",
    },
    {
        label: "IP地址",
        prop: "ip",
        width: "100",
    },
    {
        label: "User Agent",
        prop: "ua",
    },
    {
        label: "时间",
        prop: "time",
        width: "200",
        formatter: (row) => {
            return dayjs(row.time).format("YYYY-MM-DD HH:mm:ss");
        },
    },
];

const methods = [
    {
        label: "查询",
        value: "GET",
    },
    {
        label: "创建",
        value: "POST",
    },
    {
        label: "更新",
        value: "PUT",
    },
    {
        label: "删除",
        value: "DELETE",
    },
];

export default {
    tableHeader,
    methods,
};
