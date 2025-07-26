import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MonthYearPickerProps {
  onSelect: (month: number, year: number) => void
  isModal?: boolean
}

export function MonthYearPicker({ onSelect, isModal }: MonthYearPickerProps) {
  const [month, setMonth] = React.useState(new Date().getMonth()+1)
  const [year, setYear] = React.useState(new Date().getFullYear())

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  React.useEffect(() => {
    onSelect(month, year)
  }, [month, year, onSelect])

  return (
    <div className="flex items-center gap-1 md:gap-4">
      {!isModal && <Button
        variant="outline"
        size="icon"
        onClick={handlePrevMonth}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>}
      <div className="flex gap-1 md:gap-2">
        <Select
          value={month.toString()}
          onValueChange={(value) => setMonth(parseInt(value))}
        >
          <SelectTrigger className="w-[120px] md:w-[140px]">
            <SelectValue>{months[month - 1]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={(index+1).toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={year.toString()}
          onValueChange={(value) => setYear(parseInt(value))}
        >
          <SelectTrigger className="w-[80px] md:w-[100px]">
            <SelectValue>{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 5 }, (_, i) => year - 2 + i).map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!isModal && <Button
        variant="outline"
        size="icon"
        onClick={handleNextMonth}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>}
    </div>
  )
}

