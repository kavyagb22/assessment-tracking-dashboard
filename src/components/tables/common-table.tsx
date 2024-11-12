import React, {
    useState,
    useEffect,
    useMemo,
    useImperativeHandle,
    forwardRef,
    FC,
    ReactElement,
} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
} from "@nextui-org/react";
import { CommonApiError } from "@/api/types";

export interface IColumn<T = any> {
    key: string;
    title: string;
    allowsSorting?: boolean;
    render?: (item: any, column: T) => ReactElement;
    formatter?: (value: string | number) => any;
    hide?: boolean;
}

export type TSelection = "all" | Set<string | number>;

export interface TableProps {
    ref?: any;
    columns: IColumn[];
    dataSource: any[];
    dataTotal?: number;
    loading?: null | boolean;
    rowsPerPage?: number;
    isHeaderSticky?: boolean;
    bottomContentPlacement?: "inside" | "outside";
    tableWrapperClassName?: any;
    selectionMode?: "single" | "multiple" | "none";
    defaultSelectedKeys?: any[];
    pagination?: null | {
        rowsPerPage?: number;
    };
    errorInfo?: CommonApiError | null;
    loadingContent?: ReactElement;
    isFrontEndPaging?: boolean;
    onSelectionChange?: (selectionList: any[]) => void;
    onPaginationChange?: (page: number) => void;
    onSortChange?: (sortDescriptor: SortDescriptor) => any;
}

export type SortDescriptor = {
    column: string;
    direction: "ascending" | "descending";
};

function TableCellContent(props: { column: IColumn; item: any }) {
    const { column, item } = props;
    const { render, formatter, key } = column;
    let value = item[key];
    if (typeof render === "function") {
        return render(item[key], item);
    }
    if (typeof formatter === "function") {
        value = formatter(value);
    }
    return <div className="text-left">{value}</div>;
}

export const CommonTable: FC<TableProps> = forwardRef(
    (props: TableProps, ref) => {
        const {
            dataSource = [],
            dataTotal,
            columns = [],
            loading = false,
            selectionMode,
            pagination = null,
            isHeaderSticky = false,
            tableWrapperClassName = "",
            defaultSelectedKeys,
            errorInfo,
            loadingContent,
            isFrontEndPaging = true,
            onRefresh,
        } = props;
        const [pageNo, setPageNo] = useState<number>(1);
        const [selectedKeys, setSelectedKeys] = useState<TSelection>(
            new Set([])
        );
        const [sortDescriptor, setSortDescriptor] = useState<any>();
        const rowsPerPage = pagination?.rowsPerPage || 10;
        const total = dataTotal || Math.ceil(dataSource.length / rowsPerPage);

        const items = useMemo(() => {
            const start = (pageNo - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            return dataSource.slice(start, end);
        }, [pageNo, dataSource]);

        let tableRowsData = isFrontEndPaging ? items : dataSource;

        const tableRows = tableRowsData.map((item: any, index: number) => {
            return (
                <TableRow key={index}>
                    {columns.map((column) => {
                        return (
                            <TableCell key={column.key}>
                                <TableCellContent column={column} item={item} />
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        });

        const onPaginationChange = (page: number) => {
            setPageNo(page);
            props.onPaginationChange && props.onPaginationChange(page);
        };

        const onSelectionChange = (keys: TSelection) => {
            let selectedList = [];
            setSelectedKeys(keys);
            if (keys === "all") {
                selectedList = dataSource;
            } else {
                selectedList = [...keys].map((i) => dataSource[+i]);
            }
            props.onSelectionChange && props.onSelectionChange(selectedList);
        };

        const onSortChange: any = (descriptor: SortDescriptor) => {
            setSortDescriptor(descriptor);
            if (typeof props.onSortChange === "function") {
                props.onSortChange(descriptor);
            }
        };

        useEffect(() => {
            if (Array.isArray(defaultSelectedKeys)) {
                if (defaultSelectedKeys.length > 0) {
                    const keys = defaultSelectedKeys
                        .map((item) =>
                            dataSource.findIndex((n) => n.accountId === item.id)
                        )
                        .filter((n) => n >= 0);
                    setSelectedKeys(new Set(keys.map((n) => `${n}`)));
                } else {
                    setSelectedKeys(new Set([]));
                }
            }
        }, [defaultSelectedKeys]);

        useImperativeHandle(ref, () => ({
            setPageNo: (n: number) => setPageNo(n),
        }));

        if (!columns.length) {
            return !loading ? (
                <div className="border-1 border-p-100 py-[32px] rounded-[12px] h-full w-full flex items-center justify-center">
                    Empty
                </div>
            ) : null;
        }

        if (errorInfo?.code === "ECONNABORTED") {
            return (
                <div className="border-1 border-p-100 py-[32px] rounded-[12px] h-full w-full flex items-center justify-center">
                    No data
                </div>
            );
        }

        return (
            <>
                <div>
                    <Table
                        isHeaderSticky={isHeaderSticky}
                        classNames={tableWrapperClassName || {}}
                        selectionMode={selectionMode}
                        selectedKeys={selectedKeys}
                        onSortChange={onSortChange}
                        sortDescriptor={sortDescriptor}
                        onSelectionChange={onSelectionChange}
                    >
                        <TableHeader>
                            {columns.map((item: any) => {
                                return (
                                    <TableColumn
                                        key={item.key}
                                        allowsSorting={
                                            item.allowsSorting || false
                                        }
                                    >
                                        {item.title}
                                    </TableColumn>
                                );
                            })}
                        </TableHeader>
                        <TableBody
                            emptyContent={loading ? " " : "no rows"}
                            isLoading={loading as boolean}
                            loadingContent={loadingContent || <Spinner />}
                        >
                            {tableRows}
                        </TableBody>
                    </Table>
                </div>
                {/* Pagination at the Bottom */}
                {total > 1 && (
                    <div className="flex w-full justify-center mt-4">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            page={pageNo}
                            total={total}
                            onChange={onPaginationChange}
                        />
                    </div>
                )}
            </>
        );
    }
);
