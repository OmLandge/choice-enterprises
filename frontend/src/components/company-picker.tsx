import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from 'react'

interface CompanyPickerProps {
    onSelect: (companyName: string) => void
}

export function CompanyPicker({ onSelect }: CompanyPickerProps) {
    const [companyName, setCompanyName] = useState("Choose...");

    const companies = [
        "Akwel", "Aerofine", "Choice", "DDE", "DDE Unit 1", "DDE Unit 4", "Fine Pac Forge", "Galaxy", "INOX", "Kross Link", "Kwality", "Mahindra Forge", "Mahindra Gear", "Premium", "Sany Staff", "Sany Arrears", "Sany Admin Staff", "Sany Driver", "Sany Worker", "Sharda", "York"
    ]

    useEffect(() => {
        onSelect(companyName)
    }, [companyName, onSelect])

    return (
        <div className="flex items-center gap-1 md:gap-4">
            <Select
                value={companyName}
                onValueChange={(value) => setCompanyName(value)}
            >
                <SelectTrigger className="w-[120px] md:w-[140px]">
                    <SelectValue>{companyName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {companies.map((company, index) => (
                        <SelectItem key={index} value={company}>
                            {company}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

