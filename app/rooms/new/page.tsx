"use client"
import React from 'react';
import z from 'zod';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {FieldGroup, FieldLabel, Field, FieldError, FieldContent} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LoadingSwap} from "@/components/ui/loading-swap";
import {createRoomSchema} from "@/services/supabase/schemas/rooms";
import {createRoom} from "@/services/supabase/actions/rooms";
import {toast} from "sonner";



type FormData = z.infer<typeof createRoomSchema>;

const NewRoomPage = () => {

    const form = useForm<FormData>({
        defaultValues: {
            name:"",
            isPublic: false
        },
        resolver: zodResolver(createRoomSchema)
    })

    async function handleSubmit(data: FormData) {
        const { error, message } = await createRoom(data)
        if (error){
            toast.error(message)
        }
    }

    return (
        <div className={'container mx-auto px-4 py-8'}>
            <Card className={'w-full max-w-lg mx-auto'}>
                <CardHeader>
                    <CardTitle>New Room</CardTitle>
                    <CardDescription>Create a new chat room</CardDescription>
                </CardHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller name={'name'} control={form.control} render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Room Name</FieldLabel>
                                <Input {...field} id={field.name} aria-invalid={fieldState.invalid}/>
                                {
                                    fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )
                                }
                            </Field>
                        )} >

                        </Controller>


                        <Controller name={'isPublic'} control={form.control} render={({ field: {value, onChange, ...field}, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} orientation={'horizontal'}>
                                <Checkbox {...field} id={field.name} checked={value} onCheckedChange={onChange} aria-invalid={fieldState.invalid}/>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name} className={'font-normal'}>Public Room</FieldLabel>
                                    {
                                        fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </FieldContent>

                            </Field>
                        )} >
                        </Controller>

                        <Field orientation={'horizontal'} className={'w-full'}>
                            <Button type={'submit'} className={'grow'}
                               disabled={form.formState.isSubmitting}>
                                <LoadingSwap isLoading={form.formState.isSubmitting}>
                                    Create Room
                                </LoadingSwap>
                            </Button>
                            <Button variant={'outline'} className={'ml-4'} asChild>
                                <Link href={'/'}>Cancel</Link>
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </Card>
        </div>
    );
};

export default NewRoomPage;
