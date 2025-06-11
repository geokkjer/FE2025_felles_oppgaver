function Log() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log(`Fetching user...`);
    }

}
class UserService {
    @Log()
    async fetchUser(id: number) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulerer en asynkron operasjon
        return { id: 1, name: "John Doe" };
    }
}

 const userService = new UserService();
 console.log(userService.fetchUser(1).then(user => console.log(user))); // Forventet: { id: 1, name: "John Doe" }