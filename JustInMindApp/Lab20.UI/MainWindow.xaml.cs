using JustInMindApp;
using JustInMindApp.Models;

using System.Windows;
using System.Windows.Navigation;

namespace Lab20.UI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        JustInMindContext justInMindContext = new JustInMindContext();

        public MainWindow()
        {
            InitializeComponent();
            UserId.Text = "Id";
        }

        public void AddUserButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationWindow win = new NavigationWindow();
            win.Content = new AddUserPage();
            win.Show();
        }

        public void DeleteUserButton_Click(object sender, RoutedEventArgs e)
        {
            var user = new User()
            {
                Id = int.Parse(UserId.Text)
            };

            justInMindContext.Users.Attach(user);
            justInMindContext.Users.Remove(user);

            justInMindContext.SaveChanges();
        }

        public void EditUserButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationWindow win = new NavigationWindow();
            win.Content = new EditUserPage();
            win.Show();
        }

        public void ViewUsers_Click(object sender, RoutedEventArgs e)
        {
            NavigationWindow win = new NavigationWindow();
            win.Content = new UsersView();
            win.Show();
        }

        public void AddTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }

        public void DeleteTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }

        public void EditTaskButton_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
