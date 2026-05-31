import { z } from "zod";

export const sandboxFormSchema = z.object({
  supplierName: z.string().min(2, { message: "Supplier name must be at least 2 characters." }),
  supplierTrn: z.string().min(10, { message: "TRN/VATIN must be at least 10 characters." }),
  customerName: z.string().min(2, { message: "Customer name must be at least 2 characters." }),
  customerTrn: z.string().min(10, { message: "TRN/VATIN must be at least 10 characters." }),
  itemName: z.string().min(2, { message: "Item description is required." }),
  qty: z.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.number().min(0.01, { message: "Price must be greater than 0." }),
});

export type SandboxFormValues = z.infer<typeof sandboxFormSchema>;
