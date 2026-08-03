import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DocumentPickerProps, DocumentType } from "@/lib/types";
import { useEffect, useState } from 'react'

export function DocumentPicker({ onSelect, isModal }: DocumentPickerProps) {
    const [documentType, setDocumentType] = useState("Doc Type");

    useEffect(() => {
        onSelect(documentType)
    }, [documentType, onSelect])

    return (
        <div className="flex items-center gap-1 md:gap-4">
            <Select
                value={documentType}
                onValueChange={(value) => {
                    setDocumentType(value);
                }}
            >
                <SelectTrigger className={`${isModal ? "w-full" : "w-[120px] md:w-[140px]"}`}>
                    <SelectValue>{documentType}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Object.values(DocumentType).map((t) => (
                        <SelectItem key={t} value={t}>
                            {t}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

