"use client"

import type React from "react"

import { useState, useRef , useEffect} from "react"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/dashboard-ui-component/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/dashboard-ui-component/dialog"
import { Input } from "@/components/dashboard-ui-component/input"
import { Label } from "@/components/dashboard-ui-component/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-ui-component/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui-component/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-ui-component/card"
import { Target, Plus, Upload, Download, Filter, MoreHorizontal, Users, Trash2, FileUp, HelpCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dashboard-ui-component/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/dashboard-ui-component/tooltip"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

interface List {
  id: string
  name: string
  description: string
  contactCount: number
  createdAt: string
}

export default function AudienceView() {
  const { getToken, userId } = useAuth()
  const [activeTab, setActiveTab] = useState("lists")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isCreateListOpen, setIsCreateListOpen] = useState(false)
  const [newContact, setNewContact] = useState<Partial<Contact>>({})
  const [newList, setNewList] = useState<Partial<List>>({})
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "c1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
  ])

  const [lists, setLists] = useState<List[]>([
  ])
  const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    async function getLists() {
      const token = await getToken();
      if (userId) {
        axios.get(`${baseURL}/audience/list?user_id=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((res) => {
              console.log(res.data.audience_list)
              setLists(res.data.audience_list)
          })
          .catch((err) => {
          console.log(err)
          })

      axios.get(`${baseURL}/audience/contacts/list?user_id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
              console.log(res.data.contact_list)
              setContacts(res.data.contact_list)
          })
          .catch((err) => {
              console.log(err)
          })
      }
    }
    getLists()
  }, [userId])

//   const handleAddContact = () => {
//     if (newContact.name && newContact.email && newContact.phone) {
//       const contact: Contact = {
//         id: Math.random().toString(36).substring(2, 9),
//         name: newContact.name,
//         email: newContact.email,
//         phone: newContact.phone,
//         status: "active",
//       }
//       setContacts([...contacts, contact])
//       setNewContact({})
//       setIsAddContactOpen(false)
//     }
//   }

  const handleCreateList = async () => {
    const token = await getToken();
    if (newList.name) {
            const formData = new FormData();
            if (csvFile) {
                formData.append('csv_file', csvFile);
            }   
            
            axios.post(`${baseURL}/audience/create?user_id=${userId}&audience_name=${encodeURIComponent(newList.name)}&audience_description=${encodeURIComponent(newList.description || '')}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const downloadSampleCSV = () => {
    // Create sample CSV content
    const csvContent = `name,email,phone
John Smith,john.smith@example.com,+91-9109725094
Sarah Johnson,sarah.j@example.com,+1-5559876543
Michael Brown,michael.b@example.com,+1-5554567890
Emily Davis,emily.d@example.com,+1-5552345678
David Wilson,david.w@example.com,+1-5558765432`

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "contacts_sample.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredContacts = contacts.filter((contact) => {
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query)
    )
  })

  const contactColumns = [
    {
      header: "Name",
      accessorKey: "name" as keyof Contact,
    },
    {
      header: "Email",
      accessorKey: "email" as keyof Contact,
    },
    {
      header: "Phone",
      accessorKey: "phone" as keyof Contact,
    },
    // {
    //   header: "Status",
    //   accessorKey: "status" as keyof Contact,
    //   cell: (contact: Contact) => {
    //     const statusColors = {
    //       active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    //       inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    //       contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    //       converted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    //     }

    //     return (
    //       <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[contact.status]}`}>
    //         {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
    //       </div>
    //     )
    //   },
    // },
    // {
    //   header: "Last Contacted",
    //   accessorKey: "lastContacted" as keyof Contact,
    //   cell: (contact: Contact) => <div>{contact.lastContacted || "Never"}</div>,
    // },
    {
      header: "Actions",
      accessorKey: "id" as keyof Contact,
      cell: (contact: Contact) => (
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Contact</DropdownMenuItem>
              <DropdownMenuItem>Add to List</DropdownMenuItem>
              <DropdownMenuItem>Call Now</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const listColumns = [
    {
      header: "List Name",
      accessorKey: "name" as keyof List,
    },
    {
      header: "Description",
      accessorKey: "description" as keyof List,
    },
    {
      header: "Contacts",
      accessorKey: "contactCount" as keyof List,
      cell: (list: List) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-gray-500" />
          <span>{list.contactCount}</span>
        </div>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt" as keyof List,
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof List,
      cell: (list: List) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const emptyContactsState = (
    <EmptyState
      icon={<Users className="h-12 w-12" />}
      title="No Contacts Found"
      description="You haven't added any contacts yet. Import contacts or create a list to start building your audience."
      actionLabel="Import Contacts"
      onAction={() => setIsCreateListOpen(true)}
    />
  )

  const emptyListsState = (
    <EmptyState
      icon={<Target className="h-12 w-12" />}
      title="No Lists Found"
      description="You haven't created any contact lists yet. Create a list to organize your contacts."
      actionLabel="Create List"
      onAction={() => setIsCreateListOpen(true)}
    />
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Audience</h1>
        <div className="flex space-x-2">
          {/* <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button> */}
          {activeTab === "lists" && (
            <Button onClick={() => setIsCreateListOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
          </CardHeader>
          {/* <CardContent>
            <div className="text-2xl font-bold">{contacts.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((contacts.filter((c) => c.status === "active").length / contacts.length) * 100)}% of total
            </p>
          </CardContent> */}
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lists.length}</div>
            <p className="text-xs text-muted-foreground">Across {contacts.length} contacts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lists" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="lists">Lists</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        <div className="flex justify-between items-center mt-4 mb-2">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Input
              placeholder="Search by name, email, or phone..."
              className="w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <TabsContent value="lists" className="mt-0">
          <DataTable
            data={lists}
            columns={listColumns}
            onAddNew={() => setIsCreateListOpen(true)}
            addNewLabel="Create List"
            emptyState={emptyListsState}
          />
        </TabsContent>
        <TabsContent value="contacts" className="mt-0">
          <DataTable data={filteredContacts} columns={contactColumns} emptyState={emptyContactsState} />
        </TabsContent>
      </Tabs>

      {/* Add Contact Dialog */}
      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={newContact.name || ""}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={newContact.email || ""}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={newContact.phone || ""}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) =>
                  setNewContact({
                    ...newContact,
                    status: value as Contact["status"],
                  })
                }
                defaultValue="active"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
              Cancel
            </Button>
            {/* <Button onClick={handleAddContact}>Add Contact</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create List Dialog */}
      <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="listName">List Name</Label>
              <Input
                id="listName"
                placeholder="High-Value Leads"
                value={newList.name || ""}
                onChange={(e) => setNewList({ ...newList, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="A description of this list"
                value={newList.description || ""}
                onChange={(e) => setNewList({ ...newList, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Upload Contacts (CSV)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>CSV file must include these columns: name, email, phone, status (optional)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

              {csvFile ? (
                <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center">
                    <FileUp className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-sm truncate max-w-[200px]">{csvFile.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCsvFile(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={handleFileUploadClick}
                  >
                    <FileUp className="h-8 w-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Click to upload a CSV file or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Required format: name, email, phone, status (optional)
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="ml-2">
                        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          CSV Format Requirements
                        </h4>
                        <ul className="mt-1 text-xs text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
                          <li>First row must be header row with column names</li>
                          <li>Required columns: name, email, phone</li>
                          <li>Phone numbers should include country code (e.g., +1)</li>
                        </ul>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs text-blue-600 dark:text-blue-300 p-0 h-auto mt-1"
                          onClick={downloadSampleCSV}
                        >
                          Download sample CSV template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateListOpen(false)
                setCsvFile(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateList} disabled={!newList.name}>
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

