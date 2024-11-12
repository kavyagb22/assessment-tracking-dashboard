import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";

export interface UpdateScorePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (newScore: number) => void; // Function to handle saving the score
    initialScore?: any; // Optional initial score
}

export const UpdateScoreModal: React.FC<UpdateScorePopupProps> = (props) => {
    const { isOpen, onClose, onOpenChange, onSave, initialScore } = props;
    const [score, setScore] = useState(initialScore || "");

    useEffect(() => {
        setScore(initialScore || ""); // Reset score when modal opens or initial score changes
    }, [initialScore, isOpen]);

    const onConfirmButtonClick = () => {
        const parsedScore = parseInt(score, 10);
        if (!isNaN(parsedScore)) {
            onSave(parsedScore); // Call the save function with the new score
            onClose(); // Close the modal
        } else {
            console.error("Invalid score input");
        }
    };

    return (
        <Modal
            size="md"
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            hideCloseButton={false}
        >
            <ModalContent>
                <ModalHeader className="border">
                    <p>Update Score</p>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col items-center gap-y-6">
                        <div className="text-center mb-4">
                            <p className="text-lg font-medium text-[#18202D]">
                                Please enter new score
                            </p>
                        </div>
                        <Input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            placeholder="Enter new score"
                            min={0}
                            max={100}
                            className="w-full"
                        />
                        <Button
                            className="rounded-lg w-full h-12 text-base font-extrabold"
                            color="primary"
                            variant="bordered"
                            onPress={onConfirmButtonClick}
                        >
                            Confirm
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
