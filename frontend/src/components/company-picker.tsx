import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CompanyPickerProps } from "@/lib/types";
import { useEffect, useState } from 'react'

export function CompanyPicker({ onSelect, companies, isModal }: CompanyPickerProps) {
    const [companyName, setCompanyName] = useState("Choose...");
    const [companyCode, setCompanyCode] = useState("");

    useEffect(() => {
        onSelect(companyCode)
    }, [companyCode, onSelect])

    return (
        <div className="flex items-center gap-1 md:gap-4">
            <Select
                value={companyName}
                onValueChange={(value) => {
                    setCompanyName(companies.find((company) => company.code === value)?.name || "Choose...");
                    setCompanyCode(value);
                }}
            >
                <SelectTrigger className={`${isModal ? "w-full" : "w-[120px] md:w-[140px]"}`}>
                    <SelectValue>{companyName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {companies.map((company, index) => (
                        <SelectItem key={index} value={company.code}>
                            {company.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

