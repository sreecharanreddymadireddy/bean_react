class InvoiceService {
    static async getInvoicesForMonth(month) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/invoicesForMonth?month=${month}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch invoices. Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching invoices: ${error.message}`);
        }
    }
}

export default InvoiceService;
