"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/dashboard-ui-component/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/dashboard-ui-component/dialog"
import { Input } from "@/components/dashboard-ui-component/input"
import { Label } from "@/components/dashboard-ui-component/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard-ui-component/select"
import { Phone, Plus, CreditCard, Coins, AlertCircle } from "lucide-react"
import axios from "axios"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { useAuth } from "@clerk/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { loadStripe } from "@stripe/stripe-js"
import StripeCheckout from "@/components/payment/wallet-topup"
import { StorageService } from "@/services/storage-service"
interface PhoneNumber {
  id: string
  number: string
  country: string
  status: "active" | "inactive"
  monthlyCost?: string
}

function formatPhoneNumber(number: string) {
  const phoneNumber = parsePhoneNumberFromString("+" + number)
  return phoneNumber ? phoneNumber.formatInternational() : number
}

export default function PhoneNumbersView() {
  const { getToken, userId } = useAuth()
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false)
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false)
  const [newNumber, setNewNumber] = useState({ number: "", country: "US" })

  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; number: string; country: string; price: string }>
  >([])
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null)
  const [selectedNumberData, setSelectedNumberData] = useState<{
    id: string
    number: string
    country: string
    price: string
  } | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchStep, setSearchStep] = useState<"input" | "results">("input")

  // Payment dialog state
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [userCredits, setUserCredits] = useState({
    credits: 0,
    free_phone_number_credits: 0,
  }) // Mock user credits
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"credits" | "direct">("credits")
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false)

  const [first_onboarding_agent_phone_number, setFirstOnboardingAgentPhoneNumber] = useState(false)
  const [first_onboarding_agent_campaign, setFirstOnboardingAgentCampaign] = useState(false)

  const handleSearchNumbers = async () => {
    if (newNumber.country) {
      setIsSearching(true)

      try {
        const token = await getToken()

        const response = await axios.post(
          "http://localhost:5000/phoneNumber/search",
          {
            country: newNumber.country,
            prefixNumber: newNumber.number,
            user_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data.length > 0) {
          setSearchResults(response.data)
          setSearchStep("results")
        } else {
          
          setSearchStep("input")
        }
      } catch (error) {
        console.error("Error searching for numbers:", error)
      } finally {
        setIsSearching(false)
      }
    }
  }

  const handleBuyButtonClick = () => {
    if (selectedNumber) {
      const numberData = searchResults.find((result) => result.number === selectedNumber)
      if (numberData) {
        setSelectedNumberData(numberData)
        setIsPaymentDialogOpen(true)
        currentUserCredits()
      }
    }
  }

  const currentUserCredits = async () => {
    const token = await getToken()
    const response = await axios.post("http://localhost:5000/user/current-credit-balance", {
      user_id: userId,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    setUserCredits(response.data)
  }

  const handleDirectPayment = async (amount: number) => {
    try {
      // Set loading state
      setIsProcessingTopUp(true)

      // Initialize Stripe - in a real app, you would store this in an environment variable
      const stripePromise = loadStripe("pk_test_51McNXmSC9YCe2JrN9gFEctmwqzzx7lUivh3KkmBdGM4q0wagJocDvDERTlrOIqWS3DbgsY6HqfUlSlFCoW1T29jI00ujRlhXxm")
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Stripe failed to initialize")
      }

      const token = await getToken()

      // Make a request to your backend to create a Checkout Session
      const response = await axios.post("http://localhost:5000/user/phone-number-purchase-direct", {
        amount: amount,
        user_id: userId,
        phone_number_id: selectedNumberData?.id,
        phone_number: selectedNumberData?.number,
      } , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const session = response.data

      // Redirect to Stripe Checkout
      window.open(session.url, "_blank")

      //  listen for the window custom event
      window.addEventListener("message", (event) => {
        console.log("window message", event.data)
        if (event.data.type === "stripe-checkout-completed") {
          setIsProcessingTopUp(false)
          setIsTopUpDialogOpen(false)
          currentUserCredits()
        }
      })

      // Note: The actual credit addition will happen in your webhook handler
      // after Stripe confirms the payment was successful
    } catch (error) {
      console.error("Payment processing error:", error)
      // Show error message to user
    } finally {
      // setIsProcessingTopUp(false)
      // We don't close the dialog here as the user will be redirected to Stripe
    }
  }

  const handlePaymentConfirm = async () => {
    try {
      // Here you would implement the actual payment logic
      if (selectedPaymentMethod === "credits") {
        const token = await getToken()
        // Process payment with credits
        axios.post("http://localhost:5000/user/purchase-phone-number-with-phone-credit", {
          user_id: userId,
          phone_number_id: selectedNumberData?.id,
          phone_number: selectedNumberData?.number,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          window.location.reload()
        }).catch((error) => {
          console.error("Payment failed:", error)
        })
      } else if (selectedPaymentMethod === "direct") {
        handleDirectPayment(Number.parseFloat(selectedNumberData?.price?.replace("$", "") || "0"))
      }

      // After successful payment, add the number to the user's account
      if (selectedNumberData) {
        const newPhoneNumber: PhoneNumber = {
          id: selectedNumberData.id,
          number: formatPhoneNumber(selectedNumberData.number),
          country: selectedNumberData.country,
          status: "active",
          monthlyCost: selectedNumberData.price,
        }

        setPhoneNumbers((prev) => [...prev, newPhoneNumber])
      }

      // Close dialogs and reset states
      // setIsPaymentDialogOpen(false)
      // setIsAddNumberOpen(false)
      // setSelectedNumber(null)
      // setSelectedNumberData(null)
      // setSearchResults([])
      // setSearchStep("input")
      // setNewNumber({ number: "", country: "US" })

      // Show success message or notification here
    } catch (error) {
      console.error("Payment failed:", error)
      // Show error message
    }
  }

  async function getPhoneNumbers() {
    const temp_first_onboarding_agent_phone_number = StorageService.getItem(`first_onboarding_agent_phone_number`) === 'true' || StorageService.getItem(`first_onboarding_agent_phone_number`) === true ? true : false;
    const temp_first_onboarding_agent_campaign = StorageService.getItem(`first_onboarding_agent_campaign`) === 'true' || StorageService.getItem(`first_onboarding_agent_campaign`) === true ? true : false;
    setFirstOnboardingAgentPhoneNumber(temp_first_onboarding_agent_phone_number)
    setFirstOnboardingAgentCampaign(temp_first_onboarding_agent_campaign)
  
    

    
    const token = await getToken()
    const phoneNumbers = await axios.post(
      "http://localhost:5000/phoneNumber/owned",
      {
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log(phoneNumbers.data)
    const phoneNumbersData = phoneNumbers.data.map((phoneNumber: any) => ({
      id: phoneNumber._id,
      number: formatPhoneNumber(phoneNumber.number),
      country:
        phoneNumber.country.split(" ").length < 2
          ? phoneNumber.country.slice(0, 2)
          : phoneNumber.country.split(" ")[0].slice(0, 1) + phoneNumber.country.split(" ")[1].slice(0, 1).toLowerCase(),
      status: "active",
      monthlyCost: phoneNumber.monthly_rental_rate + " USD",
    }))
    console.log(phoneNumbersData)
    setPhoneNumbers(phoneNumbersData)
  }

  useEffect(() => {
    if (userId) {
      StorageService.setItem(`first_onboarding_agent_phone_number`, 'true');
      StorageService.setItem(`first_onboarding_agent_campaign`, 'true');
      getPhoneNumbers()
    }
  }, [userId])

  useEffect(() => {
    if (first_onboarding_agent_phone_number === true && phoneNumbers.length === 0) {
      setIsAddNumberOpen(true)
    }else if (first_onboarding_agent_phone_number === true && phoneNumbers.length > 0) {
      StorageService.setItem(`first_onboarding_agent_phone_number`, 'false');
      window.location.href = "/dashboard/inbound"
    }
  }, [first_onboarding_agent_phone_number, phoneNumbers])

  const columns = [
    {
      header: "Phone Number",
      accessorKey: "number" as keyof PhoneNumber,
    },
    {
      header: "Country",
      accessorKey: "country" as keyof PhoneNumber,
    },
    {
      header: "Monthly Cost",
      accessorKey: "monthlyCost" as keyof PhoneNumber,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof PhoneNumber,
      cell: (phoneNumber: PhoneNumber) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            phoneNumber.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {phoneNumber.status.charAt(0).toUpperCase() + phoneNumber.status.slice(1)}
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof PhoneNumber,
      cell: (phoneNumber: PhoneNumber) => (
        <div className="flex space-x-2">
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const emptyState = (
    <EmptyState
      icon={<Phone className="h-12 w-12" />}
      title="No Phone Numbers"
      description="You haven't added any phone numbers yet. Buy a phone number to start making AI calls."
      actionLabel="Buy Phone Number"
      onAction={() => setIsAddNumberOpen(true)}
    />
  )

  // Calculate if user has enough credits
  const numberPrice = selectedNumberData ? Number.parseFloat(selectedNumberData.price.replace("$", "")) : 0
  const hasEnoughCredits = userCredits.credits >= numberPrice || userCredits.free_phone_number_credits > 0

  const handleTopUpCredits = async (amount: number) => {
    try {
      // Set loading state
      setIsProcessingTopUp(true)

      // Initialize Stripe - in a real app, you would store this in an environment variable
      const stripePromise = loadStripe("pk_test_51McNXmSC9YCe2JrN9gFEctmwqzzx7lUivh3KkmBdGM4q0wagJocDvDERTlrOIqWS3DbgsY6HqfUlSlFCoW1T29jI00ujRlhXxm")
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Stripe failed to initialize")
      }

      const token = await getToken()

      // Make a request to your backend to create a Checkout Session
      const response = await axios.post("http://localhost:5000/user/wallet-topup-create-checkout-session", {
        amount: amount,
        user_id: userId,
        credits: amount, // Calculate credits based on package
      } , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const session = response.data

      // Redirect to Stripe Checkout
      window.open(session.url, "_blank")

      //  listen for the window custom event
      window.addEventListener("message", (event) => {
        console.log("window message", event.data)
        if (event.data.type === "stripe-checkout-completed") {
          setIsProcessingTopUp(false)
          setIsTopUpDialogOpen(false)
          currentUserCredits()
        }
      })

      // Note: The actual credit addition will happen in your webhook handler
      // after Stripe confirms the payment was successful
    } catch (error) {
      console.error("Payment processing error:", error)
      // Show error message to user
    } finally {
      // setIsProcessingTopUp(false)
      // We don't close the dialog here as the user will be redirected to Stripe
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Phone Numbers</h1>
        <Button onClick={() => setIsAddNumberOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Buy Phone Number
        </Button>
      </div>

      <DataTable
        data={phoneNumbers}
        columns={columns}
        onAddNew={() => setIsAddNumberOpen(true)}
        addNewLabel="Buy Phone Number"
        emptyState={emptyState}
      />

      {/* Search and Results Dialog */}
      <Dialog
        open={isAddNumberOpen}
        onOpenChange={(open) => {
          setIsAddNumberOpen(open)
          if (!open) {
            setSearchResults([])
            setSelectedNumber(null)
            setSearchStep("input")
          }
        }}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Buy Phone Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {searchStep === "input" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={newNumber.country}
                    onValueChange={(value) => setNewNumber({ ...newNumber, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States (+1)</SelectItem>
                      <SelectItem value="GB">United Kingdom (+44)</SelectItem>
                      <SelectItem value="CA">Canada (+1)</SelectItem>
                      <SelectItem value="IN">India (+91)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Phone Number</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="number"
                      placeholder="Enter a prefix or a number"
                      value={newNumber.number}
                      onChange={(e) => setNewNumber({ ...newNumber, number: e.target.value })}
                      className="flex-1"
                    />
                    <Button onClick={handleSearchNumbers} disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <span className="mr-2">Searching...</span>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        </>
                      ) : (
                        "Search"
                      )}
                    </Button>

                  </div>
                </div>
              </div>
            )}

            {searchStep === "results" && searchResults.length > 0 && (
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Available Numbers</h3>
                  <div className="text-sm text-muted-foreground">{searchResults.length} numbers found</div>
                </div>

                <div className="border rounded-md overflow-hidden max-h-[300px] overflow-y-auto">
                  <table className="w-full overflow-y-auto">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="text-left p-2">Select</th>
                        <th className="text-left p-2">Phone Number</th>
                        <th className="text-left p-2">Country</th>
                        <th className="text-left p-2">Monthly Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((result) => (
                        <tr
                          key={result.id}
                          className={`border-t hover:bg-muted/50 cursor-pointer ${selectedNumber === result.number ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedNumber(result.number)}
                        >
                          <td className="p-2">
                            <input
                              type="radio"
                              name="phoneNumber"
                              checked={selectedNumber === result.number}
                              onChange={() => setSelectedNumber(result.number)}
                              className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary"
                            />
                          </td>
                          <td className="p-4 font-medium">{formatPhoneNumber(result.number)}</td>
                          <td className="p-4">{result.country}</td>
                          <td className="p-4 font-medium">{result.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => {setNewNumber({ ...newNumber, number: "" , country: "US" }); setSearchStep("input")}} disabled={isSearching} className="bg-red-500 hover:bg-red-600" >
              Reset
            </Button>
            <Button variant="outline" onClick={() => setIsAddNumberOpen(false)}>
              Cancel
            </Button>
            {searchResults.length > 0 && searchStep === "results" ? (
              <Button onClick={handleBuyButtonClick} disabled={!selectedNumber}>
                Buy Number
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
          </DialogHeader>

          {selectedNumberData && (
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Phone Number:</span>
                  <span>{formatPhoneNumber(selectedNumberData.number)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Country:</span>
                  <span>{selectedNumberData.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price:</span>
                  <span className="text-lg font-bold">{selectedNumberData.price}</span>
                </div>
              </div>

              <Separator />

              <Tabs
                defaultValue="credits"
                onValueChange={(value) => setSelectedPaymentMethod(value as "credits" | "direct")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credits">Pay with Credits</TabsTrigger>
                  {/* <TabsTrigger value="direct">Pay Now</TabsTrigger> */}
                </TabsList>

                <TabsContent value="credits" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Account Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col justify-between items-center mb-4">
                        <div className="flex flex-row justify-between items-center w-full">
                          <span>Available Credits:</span>
                          <span className="text-xl font-bold">${userCredits.credits.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                          <span>Free phone number credits:</span>
                          <span className="text-xl font-bold">{userCredits.free_phone_number_credits}</span>
                        </div>
                        
                      </div>
                      
                      

                      {hasEnoughCredits ? (
                        <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-start">
                          <div className="mr-2 mt-0.5">
                            <Coins className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Sufficient credits available</p>
                            {userCredits.free_phone_number_credits > 0 ? (
                              <p className="text-sm">You have {userCredits.free_phone_number_credits} free phone number credits remaining</p>
                            ): (
                              <p className="text-sm">Your account will be charged ${numberPrice.toFixed(2)} credits</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 text-amber-700 p-3 rounded-md flex items-start">
                          <div className="mr-2 mt-0.5">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Insufficient credits</p>
                            <p className="text-sm">You need ${(numberPrice - userCredits.credits).toFixed(2)} more credits</p>
                            {/* <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsTopUpDialogOpen(true)}>
                              Top Up Credits
                            </Button> */}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="direct" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Credit Card Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Pay with credit card</p>
                          <p className="text-sm text-muted-foreground">Secure payment processed by Stripe</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 text-blue-700 p-3 rounded-md">
                        <p className="text-sm">
                          You will be redirected to our secure payment processor to complete your purchase.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentConfirm} disabled={selectedPaymentMethod === "credits" && !hasEnoughCredits}>
              {selectedPaymentMethod === "credits" ? userCredits.free_phone_number_credits > 0 ? "Pay with free phone credits" : "Pay with credits" : "Proceed to Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={isTopUpDialogOpen} onOpenChange={setIsTopUpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Top Up Credits</DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Select a credit package to add to your account</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTopUpCredits(10)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">$10</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTopUpCredits(25)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">$25</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTopUpCredits(50)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">$50</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 bg-blue-50 text-blue-700 p-3 rounded-md">
              <p className="text-sm">
                Credits are added immediately to your account and can be used for purchasing phone numbers and other
                services.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTopUpDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}

