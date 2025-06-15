import React, { useEffect, useState } from 'react';

const Settings = () => {
    const [importedData, setImportedData] = useState<any[]>([]);
    const [importedId, setImportedId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        fetch("http://localhost/PJG/dashboard/dashboard/react-php/getAllImportedId.php")
            .then((res) => res.json())
            .then((data) => {
                setImportedData(data);
                const stored = sessionStorage.getItem("importedId");
                if (stored) {
                    setImportedId(stored);
                } else if (data.length > 0) {
                    const latest = data[0].date_imported_id;
                    setImportedId(latest);
                    sessionStorage.setItem("importedId", latest);
                }
            })
            .finally(() => setLoading(false));
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmitting(true);
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/PJG/dashboard/dashboard/react-php/set_session.php", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ importedId }),
            });

            const result = await res.json();
            if (result.success) {
                console.log("Session set successfully:", result.storedId);
                sessionStorage.setItem("importedId", importedId);
                setTimeout(() => {
                    setIsSubmitting(false);
                }, 1000);
            } else {
                console.error("Session update failed:", result.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error setting session:", error);
            setIsSubmitting(false);
        }
    };
   


    return (
        <div className='mt-24'>
            <div className="flex justify-center items-center mt-10 w-full p-2 bg-green-900">
                <form onSubmit={handleSubmit}>
                    <select
                        value={importedId}
                        onChange={(e) => setImportedId(e.target.value)}
                        className="p-2 rounded text-black"
                    >
                        <option value="">-- Select Imported Date --</option>
                        {importedData.map((item) => (
                            <option key={item.date_imported_id} value={item.date_imported_id}>
                                {item.date_imported}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {isSubmitting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg text-lg font-medium">
                        Setting session, please wait...
                    </div>
                </div>
            )}
        </div>
    );

};

export default Settings;
