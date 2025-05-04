
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Calculator } from "lucide-react";

interface PaymentCalculatorProps {
  className?: string;
}

const PaymentCalculator = ({ className }: PaymentCalculatorProps) => {
  const [paymentDetails, setPaymentDetails] = useState({
    employeeId: "",
    hourlyRate: "22.50",
    regularHours: "80",
    overtimeHours: "0",
    deductionRate: "23",
  });

  const [calculationResult, setCalculationResult] = useState({
    regularPay: 0,
    overtimePay: 0,
    grossPay: 0,
    deductions: 0,
    netPay: 0,
    calculated: false,
  });

  const handleCalculate = () => {
    const hourlyRate = parseFloat(paymentDetails.hourlyRate) || 0;
    const regularHours = parseFloat(paymentDetails.regularHours) || 0;
    const overtimeHours = parseFloat(paymentDetails.overtimeHours) || 0;
    const deductionRate = parseFloat(paymentDetails.deductionRate) || 0;
    
    const regularPay = hourlyRate * regularHours;
    const overtimePay = hourlyRate * 1.5 * overtimeHours;
    const grossPay = regularPay + overtimePay;
    const deductions = grossPay * (deductionRate / 100);
    const netPay = grossPay - deductions;
    
    setCalculationResult({
      regularPay,
      overtimePay,
      grossPay,
      deductions,
      netPay,
      calculated: true,
    });
  };

  const handleReset = () => {
    setPaymentDetails({
      employeeId: "",
      hourlyRate: "22.50",
      regularHours: "80",
      overtimeHours: "0",
      deductionRate: "23",
    });
    
    setCalculationResult({
      regularPay: 0,
      overtimePay: 0,
      grossPay: 0,
      deductions: 0,
      netPay: 0,
      calculated: false,
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" /> Payment Calculator
        </CardTitle>
        <CardDescription>Calculate employee payments including overtime and deductions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="employeeId">Employee</Label>
            <Select
              value={paymentDetails.employeeId}
              onValueChange={(value) => setPaymentDetails({ ...paymentDetails, employeeId: value })}
            >
              <SelectTrigger id="employeeId">
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Maria Garcia</SelectItem>
                <SelectItem value="2">James Wilson</SelectItem>
                <SelectItem value="4">David Thompson</SelectItem>
                <SelectItem value="5">Olivia Martinez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                value={paymentDetails.hourlyRate}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, hourlyRate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deductionRate">Deduction Rate (%)</Label>
              <Input
                id="deductionRate"
                type="number"
                step="0.1"
                value={paymentDetails.deductionRate}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, deductionRate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="regularHours">Regular Hours</Label>
              <Input
                id="regularHours"
                type="number"
                step="0.5"
                value={paymentDetails.regularHours}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, regularHours: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="overtimeHours">Overtime Hours</Label>
              <Input
                id="overtimeHours"
                type="number"
                step="0.5"
                value={paymentDetails.overtimeHours}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, overtimeHours: e.target.value })}
              />
            </div>
          </div>
        </div>

        {calculationResult.calculated && (
          <div className="mt-6 border rounded-lg p-4 bg-muted/50">
            <h3 className="text-sm font-medium mb-2">Payment Summary</h3>
            <dl className="space-y-1">
              <div className="flex justify-between text-sm">
                <dt>Regular Pay:</dt>
                <dd>{formatCurrency(calculationResult.regularPay)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt>Overtime Pay:</dt>
                <dd>{formatCurrency(calculationResult.overtimePay)}</dd>
              </div>
              <div className="flex justify-between font-medium">
                <dt>Gross Pay:</dt>
                <dd>{formatCurrency(calculationResult.grossPay)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt>Deductions:</dt>
                <dd>- {formatCurrency(calculationResult.deductions)}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold">
                <dt>Net Pay:</dt>
                <dd>{formatCurrency(calculationResult.netPay)}</dd>
              </div>
            </dl>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>Reset</Button>
        <Button onClick={handleCalculate}>Calculate Payment</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentCalculator;
