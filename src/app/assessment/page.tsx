"use client";
import React, { useState, useEffect } from "react";
import { CommonTable, IColumn } from "../../components/tables/common-table";
import { Button, Input } from "@nextui-org/react";
import {
    createAssessmentAPI,
    getAssessmentAPI,
    updateAssessmentAPI,
} from "@/api/assessment/index";
import { AssessmentData } from "@/api/assessment/types";

// Status options for filtering and adding assessments
const STATUS_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
];

export default function AssessmentPage() {
    const [data, setData] = useState([]);
    const [newAssessment, setNewAssessment] = useState({
        candidateName: "",
        title: "",
        date: "",
        status: "Pending",
        score: "",
    });
    const [filterStatus, setFilterStatus] = useState("All");
    const [editingScoreId, setEditingScoreId] = useState(0);
    const [newScore, setNewScore] = useState("");

    // Define columns for the CommonTable
    const columns: IColumn[] = [
        { key: "id", title: "Candidate ID" },
        { key: "candidateName", title: "Candidate Name" },
        { key: "title", title: "Assessment Title" },
        {
            key: "date",
            title: "Assigned Date",
            formatter: (value) => new Date(value).toLocaleDateString(),
        },
        {
            key: "status",
            title: "Status",
            render: (status) => (
                <span className={`status-${status.toLowerCase()}`}>
                    {status}
                </span>
            ),
        },
        {
            key: "score",
            title: "Score",
            render: (score, item) =>
                editingScoreId === item.id ? (
                    <input
                        type="number"
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                        min={0}
                        max={100}
                        className="w-20 border border-white text-white bg-gray-800 rounded p-1"
                        placeholder="Enter score"
                    />
                ) : (
                    <span>{score !== null ? score : "N/A"}</span>
                ),
        },
        {
            key: "actions",
            title: "Actions",

            render: (id, item) => (
                <div className="flex gap-2">
                    {editingScoreId === item?.id ? (
                        <>
                            <Button
                                size="sm"
                                onClick={() => handleSaveScore(item)}
                            >
                                Save
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleCancelEdit}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            {console.log("Action item:", item, id)}
                            <Button
                                size="sm"
                                onClick={() => handleEditScore(item)}
                            >
                                Update Score
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleMarkAsCompleted(item)}
                                disabled={item?.status === "Completed"}
                            >
                                Mark as Completed
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    const handleAddAssessment = async (event: any) => {
        event.preventDefault();
        try {
            await createAssessmentAPI(newAssessment);
            fetchAssessments();
            setNewAssessment({
                candidateName: "",
                title: "",
                date: "",
                status: "Pending",
                score: "",
            });
        } catch (error) {
            console.error("Error creating assessment:", error);
        }
    };

    const handleEditScore = (assessment: AssessmentData) => {
        setEditingScoreId(assessment.id);
        setNewScore(assessment.score ?? "");
    };

    const handleSaveScore = async (item: AssessmentData) => {
        try {
            await updateAssessmentAPI(item.id, { ...item, score: newScore });
            fetchAssessments();
        } catch (error) {
            console.error("Error updating score:", error);
        } finally {
            handleCancelEdit();
        }
    };

    const handleCancelEdit = () => {
        setEditingScoreId(0);
        setNewScore("");
    };

    const handleMarkAsCompleted = async (item: AssessmentData) => {
        console.log("mark: ", item);
        try {
            await updateAssessmentAPI(item.id, {
                status: "Completed",
                score: item.score,
                candidateName: item.candidateName,
                title: item.title,
                date: item.date,
            });
            fetchAssessments();
        } catch (error) {
            console.error("Error marking as completed:", error);
        }
    };

    const fetchAssessments = async () => {
        try {
            const response = await getAssessmentAPI();

            // Reverse the data to show the latest added items at the top
            const reversedData = response.data.reverse();

            console.log(reversedData); // Check if the data is in the correct order
            setData(reversedData);
        } catch (error) {
            console.error("Error fetching assessments:", error);
        }
    };

    useEffect(() => {
        fetchAssessments();
    }, []);

    const filteredData =
        filterStatus === "All"
            ? data
            : data.filter(
                  (assessment: AssessmentData) =>
                      assessment.status === filterStatus
              );

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Assessment Management</h1>

            <div className="bg-gray-800 p-4 rounded mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Add New Assessment
                </h2>
                <form
                    onSubmit={handleAddAssessment}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={newAssessment.candidateName}
                        onChange={(e) =>
                            setNewAssessment({
                                ...newAssessment,
                                candidateName: e.target.value,
                            })
                        }
                        className="border border-white text-white bg-gray-800 rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter assessment title"
                        value={newAssessment.title}
                        onChange={(e) =>
                            setNewAssessment({
                                ...newAssessment,
                                title: e.target.value,
                            })
                        }
                        className="border border-white text-white bg-gray-800 rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter candidate score"
                        value={newAssessment.score}
                        onChange={(e) =>
                            setNewAssessment({
                                ...newAssessment,
                                score: e.target.value,
                            })
                        }
                        className="border border-white text-white bg-gray-800 rounded p-2"
                        min={0}
                        max={100}
                        required
                    />
                    <input
                        type="date"
                        value={newAssessment.date}
                        onChange={(e) =>
                            setNewAssessment({
                                ...newAssessment,
                                date: e.target.value,
                            })
                        }
                        className="border border-white text-white bg-gray-800 rounded p-2"
                        required
                    />
                    <select
                        className="bg-gray-800 border border-white rounded p-2 text-white"
                        value={newAssessment.status}
                        onChange={(e) =>
                            setNewAssessment({
                                ...newAssessment,
                                status: e.target.value,
                            })
                        }
                        required
                    >
                        {STATUS_OPTIONS.filter(
                            (item) => item.value !== "All"
                        ).map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    <Button type="submit" className="mt-4 col-span-2">
                        Add Assessment
                    </Button>
                </form>
            </div>

            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Status:</label>
                <select
                    className="bg-gray-800 border border-white rounded p-2 text-white"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    {STATUS_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto w-full">
                <CommonTable
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ rowsPerPage: 5 }}
                    isFrontEndPaging
                    selectionMode="none"
                    tableWrapperClassName="bg-gray-800 rounded-lg shadow w-full"
                />
            </div>
        </div>
    );
}
