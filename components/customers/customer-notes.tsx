"use client"

import { useState } from "react"
import { Calendar, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Sample customer notes data
const customerNotesData = [
  {
    id: 1,
    customerId: 1,
    note: "Customer prefers to be contacted via email rather than phone.",
    createdBy: "John Doe",
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: 2,
    customerId: 1,
    note: "Interested in the upcoming wireless headphones. Follow up when they arrive in stock.",
    createdBy: "Jane Smith",
    createdAt: "2023-12-15T11:45:00Z",
  },
  {
    id: 3,
    customerId: 1,
    note: "VIP customer - always offer premium service and expedited shipping.",
    createdBy: "Mike Johnson",
    createdAt: "2023-11-20T09:15:00Z",
  },
]

interface CustomerNotesProps {
  customerId: number
}

export function CustomerNotes({ customerId }: CustomerNotesProps) {
  const [notes, setNotes] = useState(customerNotesData.filter((note) => note.customerId === customerId))
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const newNoteObj = {
      id: Date.now(),
      customerId,
      note: newNote,
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
    }

    setNotes([newNoteObj, ...notes])
    setNewNote("")
  }

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter a note about this customer..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddNote} disabled={!newNote.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">
            <p className="text-muted-foreground">No notes for this customer yet.</p>
          </div>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(note.createdAt)}</span>
                    <span>by {note.createdBy}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{note.note}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
