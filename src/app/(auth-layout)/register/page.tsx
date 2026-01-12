import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/components/ui/modules/register/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                BW
              </div>
            </Link>
          </div>
          <CardTitle className="text-center text-3xl font-bold text-[#002047]">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-[#65758B]">
            Fill in the details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
