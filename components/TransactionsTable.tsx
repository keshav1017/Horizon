import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default

    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', backgroundColor)} />
            <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
        </div>
    )
}

const TransactionsTable = ({ transactions }: TransactionHistoryTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-2">Transactions</TableHead>
                    <TableHead className="px-2">Amout</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Date</TableHead>
                    <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                    <TableHead className="px-2 max-md:hidden">Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date))
                    const amount = formatAmount(t.amount)
                    // console.log(t.name);
                    // console.log(t.type);

                    const isDebit = t.type === 'debit';;
                    const isCredit = t.type === 'credit';
                    // console.log(t);
                    return (
                        <TableRow key={t.id} className={`${isDebit || amount[0] == '-' ? 'bg-[#f8eaea]' : 'bg-[#dbf5e7]'}`}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            
                            <TableCell className={`font-semibold pl-2 pr-10 ${isDebit || amount[0] == '-' ? 'text-[#f04438]' : 'text-[#039855]'}`} style={{ paddingLeft: '8px', paddingRight: '35px' }}>
                                {isDebit ? `-${amount}` : isCredit ? amount : amount}
                            </TableCell>

                            <TableCell style={{ paddingLeft: '8px', paddingRight: '15px' }}>
                                <CategoryBadge category={status} />
                            </TableCell>

                            <TableCell style={{ paddingLeft: '8px', paddingRight: '15px' }} className="min-w-32">
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>

                            <TableCell style={{ paddingLeft: '8px', paddingRight: '15px' }} className="min-w-32">
                                {t.paymentChannel}
                            </TableCell>

                            <TableCell style={{ paddingLeft: '8px', paddingRight: '15px' }} className="max-md:hidden">
                                <CategoryBadge category={t.category} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TransactionsTable