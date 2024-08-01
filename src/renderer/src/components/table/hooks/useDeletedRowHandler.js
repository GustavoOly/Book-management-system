import { useState, useEffect } from 'react';

export const useDeletedRowHandler = (data, setData) => {
    const [deletedRow, setDeletedRow] = useState(null);
    const [restoreTimeout, setRestoreTimeout] = useState(null);
    const [secondsRemaining, setSecondsRemaining] = useState(5);

    useEffect(() => {
        if (deletedRow !== null) {
            setSecondsRemaining(5);
            const interval = setInterval(() => {
                setSecondsRemaining(prev => prev - 1);
            }, 1000);
            const timeout = setTimeout(() => {
                setDeletedRow(null);
            }, 5000);
            setRestoreTimeout(timeout);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [deletedRow]);

    const handleRestore = () => {
        if (deletedRow !== null) {
            const newData = [...data];
            newData.splice(deletedRow.index, 0, deletedRow);
            setData(newData);
            setDeletedRow(null);
            clearTimeout(restoreTimeout);
        }
    };

    return {
        deletedRow,
        handleRestore,
        secondsRemaining,
        setDeletedRow
    };
};
